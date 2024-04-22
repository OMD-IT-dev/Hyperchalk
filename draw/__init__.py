from toml import load

projectdata = load("pyproject.toml")

__version__ = projectdata["project"]["version"]
