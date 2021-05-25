# only needed, if you want to shorten the commands!

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PATH=$PATH:${SCRIPT_DIR}/node_modules/@ionic/cli/bin # needed for ionic

alias start='npm start'
alias status='git status'
alias gst='git status'
