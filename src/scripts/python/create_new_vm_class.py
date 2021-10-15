#! /usr/bin/env -S /usr/bin/time /usr/bin/python3.9.5

# -*- coding: utf-8 -*-

import json
import os
import sys
import shutil

import importlib.util as imp_util

from shutil import copyfile
from typing import List, Set, Tuple, Dict, Union

PATH_ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
HOME_DIR = os.path.expanduser("~")

# Needed, if you want to import dynamically from a specifically path
spec = imp_util.spec_from_file_location("utils", os.path.join(PATH_ROOT_DIR, "utils.py"))
utils = imp_util.module_from_spec(spec)
spec.loader.exec_module(utils)

mkdirs = utils.mkdirs

OBJS_DIR_PATH = PATH_ROOT_DIR+'objs/'
mkdirs(OBJS_DIR_PATH)

def print_usage():
    print('usage: <python-script> <name-from-json-file>')

# TODO: add more print text while creating the ivm and vm class
if __name__ == '__main__':
    argv = sys.argv

    # TODO: could be fixed later, maybe?
    if len(argv) < 2:
        print_usage()
        sys.exit(-1)
    
    vm_name = argv[1]

    DIR_PATH_TS = os.path.join(PATH_ROOT_DIR, '../typescript')
    assert os.path.exists(DIR_PATH_TS)
    DIR_PATH_JSON = os.path.join(PATH_ROOT_DIR, '../json')
    assert os.path.exists(DIR_PATH_JSON)
    DIR_PATH_API = os.path.join(PATH_ROOT_DIR, '../../app/api')
    assert os.path.exists(DIR_PATH_API)

    FILE_PATH_IVM_TEMP = os.path.join(DIR_PATH_TS, 'ITemplateClassVm.ts')
    assert os.path.exists(FILE_PATH_IVM_TEMP)
    FILE_PATH_VM_TEMP = os.path.join(DIR_PATH_TS, 'TemplateClassVm.ts')
    assert os.path.exists(FILE_PATH_VM_TEMP)

    file_path_class_vm_data = os.path.join(DIR_PATH_JSON, 'class_vm_data.json')
    assert os.path.exists(file_path_class_vm_data)

    with open(file_path_class_vm_data, 'r') as f:
        data = json.load(f)

    if vm_name not in data:
        print(f'vm_name "{vm_name}" is not in the data!')
        print('Available vm names:')
        print('\n'.join([f'- {name}' for name in data.keys()]))
        sys.exit(-2)

    vm_data = data[vm_name]

    l_var_name = [d['name'] for d in vm_data['attributes']]
    d_var_name_count = {}
    for var_name in l_var_name:
        if var_name not in d_var_name_count:
            d_var_name_count[var_name] = 0
        d_var_name_count[var_name] += 1
    l_dup_var_name = [var_name for var_name, count in d_var_name_count.items() if count > 1]
    if len(l_dup_var_name) > 0:
        print('There are some duplicate names!')
        print('- var_name: amount')
        print('\n'.join([f'- {dup_var_name}: {d_var_name_count[dup_var_name]}'for dup_var_name in l_dup_var_name]))
        print('Change them first, then continue creating the vm class!')
        sys.exit(-3)

    vm_folder = vm_data['folder']

    root_path_prefix = '/'.join(['..'] * (len(vm_folder.split('/'))))

    # TODO: prepare the variables here!
    var_vm_imports = ''
    var_ivm_imports = ''
    var_variables = ''
    var_init_vals = ''
    var_to_vals = ''

    d_class_to_path = {}

    # TODO: maybe add later the extended props type thing?!

    for attribute in vm_data['attributes']:
        attr_name = attribute['name']
        attr_type = attribute['type']
        attr_nullable = attribute['nullable']
        attr_array = attribute['array']

        str_arr = '[]' if attr_array else ''
        str_question = '?' if attr_nullable else ''
        str_null = (' | null' if attr_type != 'boolean' else ' | false') if attr_nullable else ''
        if attr_type in ['string', 'number', 'boolean', 'any']:
            var_variables += f'\n  {attr_name}{str_question}: {attr_type}{str_arr}{str_null};'
            var_init_vals += f'\n      this.{attr_name} = data.{attr_name} !== undefined ? data.{attr_name} : null as any;'
            var_to_vals += f'\n    data.{attr_name} = this.{attr_name} !== undefined ? this.{attr_name} : null as any;'
        elif attr_type == 'Date':
            var_variables += f'\n  {attr_name}{str_question}: Date{str_arr}{str_null};'
            var_init_vals += f'\n      this.{attr_name} = data.{attr_name} ? new Date(data.{attr_name}.toString()) : null as any;'
            var_to_vals += f'\n    data.{attr_name} = data.{attr_name} ? data.{attr_name}.toISOString() : null as any;'
        elif attr_type == 'class':
            attr_class = attribute['class']
            attr_path = attribute['path']

            # get only unique classes as imports!
            if not attr_class in d_class_to_path:
                d_class_to_path[attr_class] = attr_path

            var_variables += f'\n  {attr_name}{str_question}: {attr_class}{str_arr}{str_null};'
            var_init_vals += f'\n      this.{attr_name} = data.{attr_name} ? {attr_class}.fromJS(data.{attr_name}) : new {attr_class}();'
            var_to_vals += f'\n    data.{attr_name} = this.{attr_name} ? this.{attr_name}.toJSON() : null as any;'
        else:
            print(f'attr_type "{attr_type}" is not supported, need implementation?')
            assert False
        
    for attr_class, attr_path in sorted(d_class_to_path.items()):
        var_ivm_imports += f'import {{{attr_class}}} from "../{root_path_prefix}/{attr_path}/{attr_class}";\n'
        var_vm_imports += f'import {{{attr_class}}} from "{root_path_prefix}/{attr_path}/{attr_class}";\n'

    DIR_PATH_VM = os.path.join(DIR_PATH_API, vm_folder)
    DIR_PATH_IVM = os.path.join(DIR_PATH_VM, 'interface')
    
    if not os.path.exists(DIR_PATH_VM):
        os.makedirs(DIR_PATH_VM)
    if not os.path.exists(DIR_PATH_IVM):
        os.makedirs(DIR_PATH_IVM)

    with open(FILE_PATH_VM_TEMP, 'r') as f:
        content_vm = f.read()
    with open(FILE_PATH_IVM_TEMP, 'r') as f:
        content_ivm = f.read()

    # change the content according to the given names in the json file
    content_ivm = content_ivm.replace('ITemplateClassVm', f'I{vm_name}')
    content_ivm = content_ivm.replace('/*var_ivm_imports*/\n', var_ivm_imports)
    content_ivm = content_ivm.replace('\n  /*var_variables*/', var_variables)

    content_vm = content_vm.replace('ITemplateClassVm', f'I{vm_name}')
    content_vm = content_vm.replace('/*var_vm_imports*/\n', var_vm_imports)
    content_vm = content_vm.replace('TemplateClassVm', f'{vm_name}')
    content_vm = content_vm.replace('\n  /*var_variables*/', var_variables)
    content_vm = content_vm.replace('\n      /*var_init_vals*/', var_init_vals)
    content_vm = content_vm.replace('\n    /*var_to_vals*/', var_to_vals)

    FILE_PATH_VM = os.path.join(DIR_PATH_VM, f'{vm_name}.ts')
    FILE_PATH_IVM = os.path.join(DIR_PATH_IVM, f'I{vm_name}.ts')

    with open(FILE_PATH_VM, 'w') as f:
        f.write(content_vm)
    with open(FILE_PATH_IVM, 'w') as f:
        f.write(content_ivm)
