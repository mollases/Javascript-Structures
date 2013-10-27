function cache(limit){
  var 
    cap = limit,
    list = [];

    
    // adds an object to the cache, respecting the cap
    // if the object already exists, it does nothing    
    add = function(obj){
      var indexOf = contains(obj);
      if(indexOf !== -1){
       list[indexOf].age++;
      }

      if(list.length < cap){
        _add(obj);
      } else {
        _reset(_findNewestEntry(),obj);
      }
      _decrementAges();
    };

    // adds an object to the cache. No rules are respected.
    _add = function(obj){
      list.push({'obj' : obj, age : 1});
    }

    _reset = function(index,obj){
      list[index].obj = obj;
      list[index].age = 1;
    }

    // searches the cache to find the obj and returns its index
    // returns -1 if it didnt find anything.
    contains = function(obj) {
      for (var i = 0; i < list.length; i++) {
          if (list[i].obj === obj) {
             return i;
         }
      }
      return -1;
    };

    // finds the newest entry and returns that index location
    _findNewestEntry = function(){
      var minAge = 'unset';
      var minAgeIndex = -1;
      for (var i = 0; i < list.length; i++) {
        if(minAge === 'unset' || minAge <= list[i].age){
          minAge = list[i].age;
          minAgeIndex = i;
        }
      }
      return minAgeIndex;
    }

    _decrementAges = function(){
      for( var i = 0; i < list.length; i++){
        list[i].age--;
      }
    }
}



};