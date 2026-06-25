const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// 모든 도메인에서 내 서버에 접속할 수 있도록 CORS 허용
app.use(cors());

// 서버가 잘 켜졌는지 확인하는 기본 접속 경로
app.get('/', (req, res) => {
    res.send('🚀 나라장터 API 프록시 서버가 정상적으로 작동 중입니다!');
});

// 프론트엔드(HTML)에서 데이터를 요청할 경로
app.get('/api/bids', async (req, res) => {
    try {
        // 공공데이터포털 인증키 (디코딩된 키)
        const API_KEY = '2f2e65fa1ec8545a480d0e1986eb31bef6899bec366f995faa2fbb0acfeb244b'; 
        
        // 날짜 계산 (7일 전 ~ 오늘)
        const date = new Date();
        const year2 = date.getFullYear();
        const month2 = String(date.getMonth() + 1).padStart(2, '0');
        const day2 = String(date.getDate()).padStart(2, '0');
        const endDate = `${year2}${month2}${day2}0000`;
        
        date.setDate(date.getDate() - 7);
        const year1 = date.getFullYear();
        const month1 = String(date.getMonth() + 1).padStart(2, '0');
        const day1 = String(date.getDate()).padStart(2, '0');
        const startDate = `${year1}${month1}${day1}0000`;

        // 조달청 시설공사 상세조회 오퍼레이션 URL 조립
        const url = `http://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoCnstwk?ServiceKey=${API_KEY}&inqryDiv=1&inqryBgnDt=${startDate}&inqryEndDt=${endDate}&numOfRows=100&pageNo=1&type=json`;

        // axios를 이용해 조달청 서버로 대신 요청
        const response = await axios.get(url);
        
        // 조달청에서 받은 데이터를 그대로 프론트엔드(내 HTML)로 전달
        res.json(response.data);
        
    } catch (error) {
        console.error('API 호출 에러:', error.message);
        res.status(500).json({ error: '데이터를 가져오지 못했습니다.', details: error.message });
    }
});

// Render에서 제공하는 포트 또는 3000번 포트 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});