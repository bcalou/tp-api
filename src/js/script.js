$(document).ready(() =>{
$('#searchForm').on('submit' , (e)=>{
  let searchText = $('searchText').value();
  getRules(searchText);
  e.preventDefault();
});
});


function  getRules(searchText){
axios.get(''+searchText)
  .then((response) => {
    console.log(data);
  }).catch((err)=>{
    console.log(err);
  })
}