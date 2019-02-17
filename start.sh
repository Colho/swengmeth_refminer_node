#!/bin/bash
#
# Translates docker run arguments to RefactoringMiner parameters.


COMMAND=RefactoringMiner/bin/RefactoringMiner
REPODIR=repo

case $1 in
	"")
		$COMMAND -h
		;;
	-h)
		$COMMAND -h
		;;
	-a)
		git clone $2 $REPODIR
		if [ $? -eq 0 ]
		then
			$COMMAND -a $REPODIR $3
		fi
		;;
	-bc)
		git clone $2 $REPODIR
		if [ $? -eq 0 ]
		then
			$COMMAND -bc $REPODIR $3 $4
		fi
		;;
	-bt)
		git clone $2 $REPODIR
		if [ $? -eq 0 ]
		then
			$COMMAND -bt $REPODIR $3 $4
		fi
		;;
	-c)
		git clone $2 $REPODIR
		if [ $? -eq 0 ]
		then
			$COMMAND -c $REPODIR $3
		fi
		;;
	*)
		git clone $1 $REPODIR
		if [ $? -eq 0 ]
		then
			$COMMAND -a $REPODIR master
		fi
esac