#!/bin/bash
cd /home/kavia/workspace/code-generation/two-player-tic-tac-toe-215015-213017/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

