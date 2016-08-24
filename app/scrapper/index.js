'use strict';

var casper = require('casper').create({
  waitTimeout: 10000,
  stepTimeout: 10000,
  verbose: true,
  pageSettings: {
    webSecurityEnabled: false
  },
  onWaitTimeout: function(){
    this.echo('** Wait-Timeout **') // todo add logic
  },
  onStepTimeout: function(){
    this.echo('** Step-Timeout **') // todo add logic
  }
});
casper.start();

casper.open("<YOUR_WEBSITE>");

casper.then(function(){
  // this.test.assertExists('');
  this.waitForSelector('<SOME_EL>',
  function pass() {
    console.log("Continue")
  },
  function fail() {
    this.die("Did not load element...something went wrong")
  }
);
});


casper.then(function(){
var links = this.evaluate(function(){
  var results = [];
  var elts = document.getElementsByClassName("<SOME_CLASS>");
  for(var i = 0; i < elts.length; i++){
    var link = elts[i].getElementsByTagName("<SOME_OTHER_EL>")[0].getAttribute("<SOME_ATTR>");
    var headline = elts[i].firstChild.textContent;
    results.push({link: link, headline: headline});
  }
  return results;
  console.log("There were "  + links.length + " stories");

  for(var i = 0; i < links.length; i++){
    console.log(links[i].headline);
  }
});
});

casper.on('remote.message', function(msg){
  this.echo('remote message caught: ' + msg)
});

casper.on('page.error', function(msg, trace){
  this.echo('error: ', msg, 'ERROR')
});

casper.on('resource.error', function(msg){
  this.echo('resource error: ' + msg)
});

casper.on('resource.received', function(resource){
  console.log(resource.url)
});
casper.run();
