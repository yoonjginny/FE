document.addEventListener('DOMContentLoaded', function() {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        // 토큰이 없을 때 오류 메시지 표시
        alert('로그인 정보가 없습니다. 사용자 정보를 불러올 수 없습니다.');
        return; // 더 이상 진행하지 않고 종료
    }

    // API 요청: 사용자 정보를 가져옵니다.
    fetch('http://127.0.0.1:8000/api/accounts/profiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // 토큰을 헤더에 포함
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('잘못된 토큰이거나 인증이 실패했습니다.');
        }
        return response.json();
    })
    .then(data => {
        // 서버에서 받은 데이터로 화면 업데이트
        document.getElementById('email').textContent = data.email || '이메일 정보 없음';
        document.getElementById('username').textContent = data.username || '사용자 이름 없음';
        document.getElementById('introduction').textContent = data.introduction || '소개 없음';
        
        // 프로필 이미지 업데이트
        if (data.profile_image) {
            document.getElementById('profile-img').src = data.profile_image;
  
