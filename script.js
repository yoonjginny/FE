// 페이지가 로드될 때 API로 사용자 정보 요청
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:8000/api/accounts/profiles')
    .then(response => response.json())
    .then(data => {
        // 서버에서 받은 데이터로 화면 업데이트
        document.getElementById('email').textContent = data.email || '이메일 정보 없음';
        document.getElementById('username').textContent = data.username || '사용자 이름 없음';
        document.getElementById('introduction').textContent = data.introduction || '소개 없음';
        
        // 프로필 이미지 업데이트
        // 예시로 이미지를 사용자에 맞게 표시할 수 있도록 구현
        if (data.profile_image) {
            document.getElementById('profile-img').src = data.profile_image;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('정보를 불러오는 데 문제가 발생했습니다.');
    });
});
