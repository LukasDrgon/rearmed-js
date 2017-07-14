(function(){
  "use strict";

  Object.rearmed.add({
    except: function(keys){
      var keys;
      if(arguments.length === 0){
        keys = [];
      }else if(arguments.length === 1){
        if(Array.isArray(arguments[0])){
          keys = arguments[0];
        }else{
          keys = [arguments[0]];
        }
      }else{
        keys = arguments;
      }

      var obj = {};
      for(var k in this){
        var bool = true;
        for(var i=0;i<keys.length;i++){
          if(k === keys[i]){
            bool = false;
            break;
          }
        }
        if(bool){
          obj[k] = this[k];
        }
      }
      return obj;
    }
  });
}(this));
