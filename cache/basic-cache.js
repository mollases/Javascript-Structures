function BasicCache(limit){
    this.cap = limit,
    this.list = [];
}
    
// adds an object to the cache, respecting the cap
// if the object already exists, it does nothing    
BasicCache.prototype.add = function(key,obj){
    if(this.contains(key)){
     this.list[key].age++;
    } else if(this.list.length <= this.cap){
      this._add(key,obj);
      this.list.length - 1;
    } else {
      indexOf = this._findNewestEntry();
      this._reset(indexOf,key,obj);
    }
    this._decrementAges(key);
  };

// checks to see if the key is within the list of keys.
BasicCache.prototype.contains = function(key) {
  clog('contains running on key "'+key+'"');
  return this.list[key] !== undefined;
};

BasicCache.prototype.get = function(key){
  clog('getting '+ key);
  if(this.contains(key)){
    return this.list[key].value;
  } else {
    return undefined;
  }
}

// prints out useful information regarding the BasicCache and its contents.
BasicCache.prototype.printInfo = function(){
  clog('--- warning, not the best print method ---');
  clog('cap = '+this.cap);
  for(var i = 0; i < this.list.length; i++){
    if(this.list[i] !== undefined){
      clog( i +': {value: '+this.list[i].value + ', age: '+this.list[i].age+'}');
    }
  }
  clog('--- end warning, wysiwyg ---');
}

// adds a key value pair to the cache. No rules are respected.
BasicCache.prototype._add = function(key,obj){
  clog('force addition called');
  this.list[key] = {'value' : obj, age : 1};
};

// as caches are time sensitive by nature
// we decrement the age factor to get the least recently used on new additions.
BasicCache.prototype._decrementAges = function(key){
  clog('decrementing all ages')
  for( var i = 0; i < this.list.length; i++){
    if(this.list[i] !== undefined)
    this.list[i].age--;
  }
  this.list[key].age++;
};

// finds the newest entry and returns that index location
BasicCache.prototype._findNewestEntry = function(){
  var minAge;
  var minAgeIndex = -1;
  for (var i = 0; i < this.list.length; i++) {
    if(this.list[i] !== undefined){
      if(minAge === undefined || minAge >= this.list[i].age){
        clog('minAge set to '+this.list[i].age);
        minAge = this.list[i].age;
        minAgeIndex = i;
      }
    }
  }
  return minAgeIndex;
};

// resets a given index to a new obj.
BasicCache.prototype._reset = function(index,key,obj){
  clog('deleting index '+index);
  delete this.list[index];
  this._add(key,obj);
};

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
cache.add('1','hello');
cache.add('2','hi');
cache.add('1','hello');
cache.add('3','good');
cache.add('4','bad');
cache.printInfo();