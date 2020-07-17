(function () {

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'

  // 先定義ＤＯＭ元件 
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')

  const data = []
  //api const 
  const dataPanel = document.getElementById('data-panel')

  // listen to search form submit event 設置監聽器

  searchForm.addEventListener('submit', event => {


    event.preventDefault()  ///讓輸入時不要刷新頁面


    // 取得SearchBar input .value //
    let input = searchInput.value.toLowerCase()

    console.log(input)

    //使用 include 比對關鍵字串找出內容title  

    let results = data.filter(

      movie => movie.title.toLowerCase().includes(input)

    )

    // let results = data.filter(
    //   movie => movie.title === input
    // )

    //如有符合的 title === input 
    //則刷新並且輸入電影img 和 title 

    displayDataList(results)

    console.log(results)
    console.log('click!')
  })


  //about API // 


  axios.get(`https://movie-list.alphacamp.io/api/v1/movies/`)
    .then((response) => {
      // console.log(response)
      // console.log(response.data)
      console.log(response.data.results)

      data.push(...response.data.results)
      displayDataList(data)
    })
    .catch((err) => console.log(err))

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach((item, index) => {
      htmlContent += ` 
<div class="col-sm-3">
  <div class="card mb-2"> 
     <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap"> 

     <div class="card-body movie-item-body"> <h5 class="card-title">${item.title}</h5>
     </div>


<!------  toggle th  open Model  -------> 
<!--- 增加一個 bootstrap 按鈕 button , 可以透握點擊開啟新互動視窗 ----> 


    <div class="card-footer">
      <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal">More</button>
    </div>




 </div> 
</div> ` })

    dataPanel.innerHTML = htmlContent


  }



  //searchBar input 取得 input值 




  //data-panpel  +++  listen to data-panel //

  dataPanel.addEventListener('click', (event) => {

    if (event.target.matches('.btn-show-movie')) {


      //who trigger it 
      console.log(event.target)

    }

  })






})()