Watches = new Mongo.Collection('watches');


if (Meteor.isClient) {
  Template.main.helpers({
    watches: function(){
      return Watches.find({})
    }
  });
}

if (Meteor.isServer) {
  Router.route('/watchedItems/:sku', {where: 'server'})
  .get(function(){
    this.response.end(JSON.stringify(Watches.find({sku: this.params.sku}).fetch()))
  });

  Router.route('/watchedItems/decrement/:sku', {where: 'server'})
  .post(function(){
    var item = Watches.findOne({sku: this.params.sku});
    Watches.update(item, {$inc: {qtyRemaining: -1}});
    this.response.end(JSON.stringify(Watches.find({sku: this.params.sku}).fetch()))
  });
}

Router.route('/', function(){
  this.render('main');
});
