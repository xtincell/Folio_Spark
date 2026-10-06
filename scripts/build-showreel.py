#!/usr/bin/env python3
"""Compatibility entry point for the authored Node/Canvas motion renderer."""
from pathlib import Path
import subprocess
import sys
subprocess.run(['node', str(Path(__file__).with_suffix('.mjs')), *sys.argv[1:]], check=True)
