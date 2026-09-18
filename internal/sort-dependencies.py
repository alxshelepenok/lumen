import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--input", help="Input package.json file", required=True)

args = parser.parse_args()

input_file = args.input

with open(input_file, "r") as file:
    package = json.load(file)

if "dependencies" in package:
    package["dependencies"] = dict(sorted(package["dependencies"].items()))

if "devDependencies" in package:
    package["devDependencies"] = dict(sorted(package["devDependencies"].items()))

with open(input_file, "w") as file:
    json.dump(package, file, indent=2)

print("\nDependencies sorted like a well-organized sock drawer!")
