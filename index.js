console.log("hello, vanilla.");
const startButton = document.querySelector('.start')
const tdNumbers = document.querySelectorAll('.td-number')
const trs = document.querySelectorAll('.tr')
const numberBox = document.querySelector('.numberBox')
const btn = document.querySelector('.btn')

let i = -1
let randomThreeNumbers = '';

//게임 스타트/리트라이 버튼

startButton.addEventListener('click', () => {
 
  randomThreeNumbers = ''

  const Numbers = [0,1,2,3,4,5,6,7,8,9];
  
  for (let i=0; i<3; i++) {
    randomThreeNumbers += Numbers.splice(Math.floor(Math.random()*Numbers.length),1)[0]
  };

  tdNumbers.forEach((tdNumber)=>{
    tdNumber.textContent = ''
  })
  
  i = -1
  
  numberBox.value = ''

  console.log(randomThreeNumbers)
});


//답 제출 버튼 이벤트리스너
btn.addEventListener('click',() => {

  i++;

  //input box 값을 table에 담음.
  trs[i].children[1].textContent = numberBox.value
 
  //정답 메세지 출력
  if (randomThreeNumbers !== '' && randomThreeNumbers === trs[i].children[1].textContent) {
    alert('정답입니다!')
    tdNumbers.forEach((tdNumber) => {
      tdNumber.textContent = ''
    })
    randomThreeNumbers = ''
    numberBox.value = ''
    i = -1
  }

  // Strike/Ball/같은 것 없음 판별
  let strike = 0
  let ball = 0
  trs[i].children[2].textContent = `${ball}B ${strike}S`
  let tryNumber = trs[i].children[1].textContent

  for (let k=0; k<randomThreeNumbers.length; k++) {
    if (randomThreeNumbers[k] === tryNumber[k]) {
      strike += 1
      trs[i].children[2].textContent = `${ball}B ${strike}S`
    }
  }

  for (let l=1; l<3; l++){
    if (randomThreeNumbers[0] !== tryNumber[0] && randomThreeNumbers[0] === tryNumber[l]) {
      ball += 1 
      trs[i].children[2].textContent = `${ball}B ${strike}S`
     }
  }

  for(let m=0; m<3; m=m+2) {
    if (randomThreeNumbers[1] !== tryNumber[1] && randomThreeNumbers[1] === tryNumber[m])  {
      ball += 1 
      trs[i].children[2].textContent = `${ball}B ${strike}S`
     }
  }

  for(let n=0; n<2; n++) {
    if (randomThreeNumbers[2] !== tryNumber[2] && randomThreeNumbers[2] === tryNumber[n])  {
      ball += 1 
      trs[i].children[2].textContent = `${ball}B ${strike}S`
     }
  }

  //START 버튼 안누르고 답을 낼때 출력되는 메세지
  if (randomThreeNumbers === '') {
    alert('START 버튼을 먼저 눌러주세요.')
    tdNumbers.forEach((tdNumber) => {
      tdNumber.textContent = ''
    })
  }

  //텍스트 값 10회 시도 후 실패 메세지 출력
  if (i >= 9) {
    alert('10회가 끝났습니다. 실패.')
    i = -1
    tdNumbers.forEach((tdNumber) => {
      tdNumber.textContent = ''
    })
    randomThreeNumbers = ''
  }

  //세 자리 숫자만 입력하라는 메세지
  if ( isNaN(numberBox.value) || numberBox.value.length !== 3 ) {
    alert('세 자리 숫자만 입력하세요.');
    trs[i].children[1].textContent = ''
    trs[i].children[2].textContent = ''
    i -= 1
  }

  // 답 제출 후 답안 칸 초기화
  numberBox.value = ''

});

