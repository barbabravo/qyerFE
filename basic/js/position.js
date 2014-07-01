var userposition =(function(){
    var position = function(){};
    position.prototype.showPosition = function(position,callback){

        var userposition = {};
        if(localStorage && localStorage.position){
            userposition = JSON.parse(localStorage.position);
        }else if(localStorage){
            
            userposition.lat = position.coords.latitude;
            userposition.lng = position.coords.longitude;
            userposition.timestamp = position.timestamp;
            try {
                localStorage.position = JSON.stringify(userposition);
            }catch(e){
                callback(userposition);
            }
        }

        callback(userposition);
    }
    
    position.prototype.showError = function(error){
        return false;
    }
    position.prototype.position_Execution = function(callback){
        var nowdate = new Date();
        var position;
        if(localStorage && localStorage.position){
            position = JSON.parse(localStorage.position);
        }
        
        if(localStorage && localStorage.position && (nowdate.getTime()-60000)<position.timestamp ){
            this.showPosition(position,callback);
        }else{
            if(localStorage && localStorage.position){
                try {
                    localStorage.removeItem("position");
                }catch(e){}
            }
            if (navigator.geolocation){
                var thiz = this;
                navigator.geolocation.getCurrentPosition(function(position){
                    thiz.showPosition(position,callback);
                },this.showError);
            }
        }
    }
    position.prototype.getposition = function(callback){
        return this.position_Execution(callback);
    }
    
    return new position();
})();

    






