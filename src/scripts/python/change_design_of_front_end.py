#! /usr/bin/python3.8.6

# #! /usr/bin/env -S /usr/bin/time /usr/bin/python3.8.6 -i

# # ! /usr/bin/env -S /usr/bin/time /usr/bin/python3.9.1-i

# -*- coding: utf-8 -*-

# Some other needed imports
import datetime
import dill
import gzip
import os
import pdb
import re
import sys
import shutil
import traceback

import numpy as np
import pandas as pd
import multiprocessing as mp

from copy import deepcopy, copy
from dotmap import DotMap
from functools import reduce
from memory_tempfile import MemoryTempfile
from shutil import copyfile
from pprint import pprint
from typing import List, Set, Tuple, Dict, Union
from PIL import Image

PATH_ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
HOME_DIR = os.path.expanduser("~")
TEMP_DIR = MemoryTempfile().gettempdir()

import importlib.util as imp_util

# Needed, if you want to import dynamically from a specifically path
spec = imp_util.spec_from_file_location("utils", os.path.join(PATH_ROOT_DIR, "utils.py"))
utils = imp_util.module_from_spec(spec)
spec.loader.exec_module(utils)

mkdirs = utils.mkdirs

OBJS_DIR_PATH = PATH_ROOT_DIR+'objs/'
mkdirs(OBJS_DIR_PATH)

# rel ... relative file path
rel_file_path_tab1_scss = 'src/app/tab1/tab1.page.scss'

rel_file_path_tab1_scss_nr_1 = 'themes/design_1/tab1.page.scss'
rel_file_path_tab1_scss_nr_2 = 'themes/design_2/tab1.page.scss'
rel_file_path_tab1_scss_nr_3 = 'themes/design_3/tab1.page.scss'

if __name__ == '__main__':
    # get the root project path and check if the name is correct
    root_path_project = '/'.join(PATH_ROOT_DIR.split('/')[:-3])
    project_folder_name = root_path_project.split('/')[-1]
    assert project_folder_name == 'stay-frontend'

    # check if the files exsists
    # TODO: make it more dynamical later
    assert os.path.exists(os.path.join(root_path_project, rel_file_path_tab1_scss))
    assert os.path.exists(os.path.join(root_path_project, rel_file_path_tab1_scss_nr_1))
    assert os.path.exists(os.path.join(root_path_project, rel_file_path_tab1_scss_nr_2))
    assert os.path.exists(os.path.join(root_path_project, rel_file_path_tab1_scss_nr_3))

    d_nr_to_file_path: Dict[int, str] = {
        1: rel_file_path_tab1_scss_nr_1,
        2: rel_file_path_tab1_scss_nr_2,
        3: rel_file_path_tab1_scss_nr_3,
    }

    # get the user input
    try:
        argv: List[str] = sys.argv
        design_nr: int = int(argv[1])
    except:
        raise Exception('Not an int!')

    # and check if the design is available
    try:
        assert design_nr in d_nr_to_file_path
    except:
        raise Exception('Wrong design number!')

    print("design_nr: {}".format(design_nr))

    src_file_path: str = os.path.join(root_path_project, d_nr_to_file_path[design_nr])
    dst_file_path: str = os.path.join(root_path_project, rel_file_path_tab1_scss)

    print("copy {} -> {}".format(src_file_path, dst_file_path))
    shutil.copy2(src_file_path, dst_file_path)
