import os,json
d=os.path.dirname(os.path.abspath(__file__));o={}
for f in sorted(os.listdir(d)):
    p=os.path.join(d,f)
    if os.path.isdir(p): o[f]=[x for x in sorted(os.listdir(p)) if not x.endswith(".txt")]
json.dump({"files":o},open(os.path.join(d,"games.json"),"w",encoding="utf-8"),ensure_ascii=False)
print("games.json 갱신 완료")
