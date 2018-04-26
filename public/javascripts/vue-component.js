var vm = new Vue({
    el: '#tweetsApp',
    data: {
        userName: '',
        tweets: []            
    },
    methods: {
        getTweets: function (userName) {
            if(userName == ''){                    
                alert('Name required!')
            } else {               
                var url = '/getTwitterData?userName=' + userName;                                       
            }

            var $this = this
            
            this.$http.get(url).then(response => {
                
                $this.userName = ''
                var data = response.body

                if(data.status == "error"){
                    console.log(data.status);                        
                    alert("Bad request data!")                        
                } else {
                    // success callback                        
                    this.tweets = data.tweets
                    this.status = data.status                    
                    console.log(data.tweets);                         
                }                                                                 
            }, response => { }) // error callback             
        }
    },
    computed:{
        pageUrl() {                              
            return 'https://twitter.com/'+ this.userName;  // link to user page              
        }
    }
});        