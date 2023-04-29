# watch_and_run_tests.py
import hupper
import os
import sys

from run_tests import run_tests

def start_reloader():
    reloader = hupper.start_reloader('run_tests.run_tests')

    # Add all backend directories and files to be watched
    for root, dirs, files in os.walk('app'):
        for file in files:
            if file.endswith('.py'):
                reloader.watch(os.path.join(root, file))

    # Add test files to be watched
    for root, dirs, files in os.walk('tests'):
        for file in files:
            if file.endswith('.py'):
                reloader.watch(os.path.join(root, file))

    # Watch run.py file
    reloader.watch('run.py')

    # Start the reloader
    reloader.run()

if __name__ == "__main__":
    start_reloader()
