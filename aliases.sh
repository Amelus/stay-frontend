# only needed, if you want to shorten the commands!

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PATH=$PATH:${SCRIPT_DIR}/node_modules/@ionic/cli/bin # needed for ionic

alias start='npm start'
alias status='git status'
alias gst='git status'
alias fetch='git fetch --all'
alias pull='git pull --all'
alias check='git checkout'
alias main='git checkout main'
alias f-design='git checkout feature/Design'
alias f-register='git checkout feature/Register'
alias f-login='git checkout feature/Login'
alias commit='git commit -m'
alias add='git add'
alias addall='git add --all'
