import os

path = 'assets\\images\\80\\'

files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        if '.png' in file:
            files.append(os.path.join(r, file))

for f in files:
    l = f.split("\\")
    print("'"+ "/".join(l) + "',")
