# run_tests.py
import os
import sys
import subprocess

def run_tests():
    cmd = ["pytest", "-s", "--cov=app", "--cov-report=html", "tests/"]
    subprocess.run(cmd, check=True)

if __name__ == "__main__":
    run_tests()
