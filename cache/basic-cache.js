function BasicCache(limit){
    this.cap = limit,
    this.list = [];
}
    
  // adds an object to the cache, respecting the cap
  // if the object already exists, it does nothing    
BasicCache.prototype.add = function(obj){
    var indexOf = this.contains(obj);
    if(indexOf !== -1){
     this.list[indexOf].age++;
    } else if(this.list.length < this.cap){
      this._add(obj);
      indexOf = this.list.length - 1;
    } else {
      indexOf = this._findNewestEntry();
      this._reset(indexOf,obj);
    }
    this._decrementAges(indexOf);
  };

// adds an object to the cache. No rules are respected.
BasicCache.prototype._add = function(obj){
  clog('force addition called');
  this.list.push({'obj' : obj, age : 1});
};

// resets a given index to a new obj.
BasicCache.prototype._reset = function(index,obj){
  clog('reseting index '+index);
  this.list[index].obj = obj;
  this.list[index].age = 1;
};

// searches the cache to find the obj and returns its index
// returns -1 if it didnt find anything.
BasicCache.prototype.contains = function(obj) {
  clog('contains running on obj');
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i].obj === obj) {
      clog('contains hit on index '+i);
      return i;
    }
  }
  return -1;
};

// finds the newest entry and returns that index location
BasicCache.prototype._findNewestEntry = function(){
  var minAge;
  var minAgeIndex = -1;
  for (var i = 0; i < this.list.length; i++) {
    if(minAge === undefined || minAge >= this.list[i].age){
      clog('minAge set to '+this.list[i].age);
      minAge = this.list[i].age;
      minAgeIndex = i;
    }
  }
  return minAgeIndex;
};

// as caches are time sensitive by nature
// we decrement the age factor to get the least recently used on new additions.
BasicCache.prototype._decrementAges = function(lastChange){
  clog('decrementing all ages')
  for( var i = 0; i < this.list.length; i++){
    this.list[i].age--;
  }
  this.list[lastChange].age++;
};

// prints out useful information regarding the BasicCache and its contents.
BasicCache.prototype.printInfo = function(){
  clog('cap = '+this.cap);
  for(var i = 0; i < this.list.length; i++){
    clog('{obj: '+this.list[i].obj+', age: '+this.list[i].age+'}');
  }
  clog('---');
}

// console.log alias
function clog(msg){
  console.log(msg);
}


// This usage should print:
//
//    cap = 3
//      {obj: 1, age: -1} 
//      {obj: 4, age: 1} 
//      {obj: 3, age: 0} 

var cache = new BasicCache(3);
cache.add('1');
cache.add('2');
cache.add('1');
cache.add('3');
cache.add('4');
cache.printInfo();