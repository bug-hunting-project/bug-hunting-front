# CVE-Scout
## 개요
CVE-Scout는 취약점 정보를 수집, 처리 및 제공하는 도구입니다. 최신의 취약점 정보를 신속하게 파악하고 이를 분석하여 사용자에게 제공함으로써 정보 보안 전문가들이 시스템의 보안 상태를 평가하고 필요한 대응 조치를 취할 수 있게 도와줍니다.

### 주요 기능
- 자동 수집: 웹 크롤링 기능을 통해 다양한 출처에서 취약점 정보를 자동으로 수집합니다.
- 데이터 처리: 수집된 데이터는 통합 및 정제 과정을 거쳐 데이터베이스에 저장됩니다.
- API 제공: 사용자는 REST API를 통해 저장된 취약점 정보에 접근할 수 있습니다. 이를 통해 다른 시스템이나 도구와 연동하여 사용할 수 있습니다.
- 데이터 시각화: 웹 인터페이스를 통해 취약점 데이터를 그래프나 차트 형태로 시각화하여 볼 수 있습니다. (만약 해당 기능이 프로젝트에 포함되어 있다면 추가)

## 아키텍쳐

![image](https://github.com/bug-hunting-project/CVE-Scout/assets/29292618/38b1060e-bc36-41e2-bc99-de47c9205c58)

## 서비스 화면

<b> 
  
- 메인 화면
  
![image](https://github.com/bug-hunting-project/CVE-Scout/assets/29292618/36b81581-7f86-4789-92d0-6ac2abb867e8)

<b> 

- 분석 및 레포트

![image](https://github.com/bug-hunting-project/CVE-Scout/assets/29292618/77a91b23-b409-40e7-a5c6-10b1567780e8)

<b> 

- 보고서 출력 결과물

![image](https://github.com/bug-hunting-project/CVE-Scout/assets/29292618/4727daf9-8857-479b-891a-b262356bbf87)

<b> 
  
## 시퀀스 다이어그램

![image](https://github.com/bug-hunting-project/CVE-Scout/assets/29292618/40568d5c-58c7-493f-a1c0-fa403570efdf)


## 설치 및 실행 방법

## Version
node 16 LTS

## Install
```bash
# simple install & run
npm run install:clean
# install
npm install && npm run build:tailwind
# run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

