**프로젝트 제출 방법**
1. 브랜치 네이밍 규칙에 따라 새로운 브랜치를 생성합니다.
- 브랜치 이름 형식은 project1/팀명/이름입니다.
- eg.g project1/team1/오스틴
2. 하위에 프로젝트 파일을 생성하고 진행합니다.
3. 완료한 파일을 commit, push합니다.
4. 해당 브랜치에서 Pull Request를 생성합니다.
5. PR제목은 프로젝트1_Vido Editor_팀명_이름으로 통일해주세요.
- eg.g project1/Vido Editor/team1/오스틴
6. label을 적극적으로 활용해주세요.

---

**main에 push하지 않도록 주의해 주세요**

훅 스크립트를 사용하여 로컬 환경에서 main 브랜치로의 직접 푸시를 방지할 수 있습니다.

`.git/hooks/pre-push` 파일을 생성후 아래 내용을 작성합니다.

```
#!/bin/sh

protected_branch="main"
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ "$current_branch" = "$protected_branch" ]; then
  echo "Direct push to $protected_branch branch is not allowed. Please use a pull request."
  exit 1
fi
```

아래 명령어로 실행 권한을 부여합니다.

```
chmod +x .git/hooks/pre-push
```
