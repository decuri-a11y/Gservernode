const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // CORS 문제 완벽 해결!

// 프론트엔드에서 '/api/bids'로 요청을 보내면 실행됨
app.get('/api/bids', async (req, res) => {
    try {
        const API_KEY = '내_공공데이터포털_인증키';
        const url = `http://apis.data.go.kr/1230000/ad/BidPublicInfoService/getBidPblancListInfoCnstwk?ServiceKey=${API_KEY}&inqryDiv=1&...`;
        
        // 내 서버가 조달청 서버로 대신 요청
        const response = await axios.get(url);
        
        // 받아온 데이터를 그대로 프론트엔드로 전달
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '데이터를 가져오지 못했습니다.' });
    }
});

app.listen(3000, () => console.log('서버가 3000번 포트에서 실행 중입니다.'));