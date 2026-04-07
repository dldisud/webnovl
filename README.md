# K-Webnovel-Studio: Korean Webnovel AI Studio

K-Webnovel-Studio는 한국어 웹소설 집필에 최적화된 자율형 멀티 에이전트 스튜디오 프레임워크입니다. [Inkos](https://github.com/Narcooo/inkos)의 강력한 아키텍처를 계승하면서도, 한국 웹소설 시장(문피아, 카카오페이지, 시리즈 등)의 상업적 트렌드와 독특한 문법을 완벽하게 지원합니다. 또한 Gemini, Claude, Codex(OpenAI) 등 다양한 LLM과 호환되도록 설계되었습니다.

## 🚀 핵심 기능 (Core Features)

### 1. 3단계 상세 플래닝 (3-Stage Deep Planning)
단순한 줄거리 생성을 넘어, 집필 전 세밀한 가이드를 3단계 리포트로 제공합니다.
- **[Report 1] 세계관 및 무대 배경**: 오감을 자극하는 공간 묘사, 마도기 등급 및 정세 분석.
- **[Report 2] 인물 심리 및 관계 분석**: 계급/세대별 반응 차이, 캐릭터별 고유 화법 정의.
- **[Report 3] 서사 연출 및 장면 시나리오**: 웹소설 특화 호흡, 전투 시나리오([상황 -> 약점 -> 행동 -> 결과]), 상업적 절단 포인트 설계.

### 2. 진실 기반 일관성 유지 (Truth-Centric Consistency)
- **Truth Files (JSON/Markdown)**: 모든 설정의 단일 소스(Character Sheets, Story Bible)를 기반으로 작동하여 설정 오류와 캐릭터 붕괴를 원천 차단합니다.
- **Zod Schema Validation**: 설정집 데이터의 무결성을 엄격하게 검증합니다.

### 3. 상업적 가독성 최적화 (Commercial Optimization)
- 기존 `munpia-optimizer`와 `webnovel-proofreader`의 로직을 에이전트 단위로 이식.
- 문피아식 절단신, 보상 타이밍, 모바일 가독성(줄바꿈, 문장 호흡) 극대화.

### 4. 상태 정착 (Settler Agent)
- 회차 집필 후 변화된 인물 상태나 아이템 획득 정보를 자동으로 분석하여 설정집(Truth Files)에 반영을 제안합니다.

## 🛠️ 워크플로우 (Workflow)

1. **초기화 (Init)**: `assets/templates/`를 참조하여 프로젝트별 설정집을 생성합니다.
2. **상세 플랜 (Plan)**: `plan` 명령어로 3단계 리포트를 생성하여 집필 가이드를 확정합니다.
3. **집필 (Write)**: 확정된 플랜을 바탕으로 초고를 작성합니다.
4. **검수 (Audit)**: `proof`(설정/안전) 및 `opt`(상업성) 검수를 통해 결과물을 다듬습니다.
5. **정착 (Settle)**: 최종 확정된 내용을 설정집에 업데이트합니다.

## 📥 설치 및 사용법 (Installation)

K-Webnovel-Studio는 컨텍스트와 프롬프트를 생성하여 다양한 LLM(Gemini, Claude, OpenAI) CLI나 API로 파이핑(piping)할 수 있습니다.

### 명령어 실행 (Engine Usage)

생성된 프롬프트와 컨텍스트를 각 LLM의 CLI로 전달하여 사용합니다.

#### Gemini CLI
```bash
# 3단계 상세 플랜 생성
node scripts/inkos_engine.cjs plan | gemini chat
```

#### Claude CLI
```bash
# 3단계 상세 플랜 생성
node scripts/inkos_engine.cjs plan | claude
```

#### OpenAI (Codex) CLI
```bash
# 3단계 상세 플랜 생성
node scripts/inkos_engine.cjs plan | openai chat
```

### 주요 파이프라인 명령어 (Core Commands)
```bash
# 초안용 플랜 생성
node scripts/inkos_engine.cjs plan

# 초고 집필
node scripts/inkos_engine.cjs write

# 설정/안전 검수
node scripts/inkos_engine.cjs audit proof

# 상업적 최적화 검수
node scripts/inkos_engine.cjs audit opt

# 상태 정착 제안
node scripts/inkos_engine.cjs settle_state propose
```
(위 명령어들의 출력을 선호하는 LLM CLI에 파이핑하여 사용하세요.)

## 📜 참고 사례 (Best Practice)
이 프레임워크의 플래닝 알고리즘은 **'외팔의 무인'** 프로젝트의 `회차플롯.md` 스타일을 모범 사례로 삼아 설계되었습니다. 건조하고 하드보일드한 문체, 분석적 전투 묘사, 입체적인 인물 갈등 연출에 특화되어 있습니다.

---
**Developed for Korean Webnovel Writers.**
