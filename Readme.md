# Refactoring Miner

## Building the image:
	docker build -t refminer .
You can change the image name to whatever.

## Running:
    docker run refminer <url>
	docker run refminer -h
	docker run refminer -a <url> [branch]
	docker run refminer -bc <url> <start-commit> <end-commit>
	docker run refminer -bt <url> <start-tag> <end-tag>
	docker run refminer -c <url> <commit>
	
\<url> must point to a public git repository (such as GitHub). Support for local or private remote repositories not yet implemented.
Without parameters runs '-a <repository> master'. See [RefactoringMiner documentation](https://github.com/tsantalis/RefactoringMiner) for explanations.

## Output:
Output is written to standard output. This may change in the future.