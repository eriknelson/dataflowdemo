App = Ember.Application.create();

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['foo', 'bar', 'baz'];
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('widgets', model.map(function(name) {
      return Ember.Object.create({
        name: name,
        count: 0
      });
    }));
  }
});

App.IndexController = Ember.Controller.extend({
  areAllAboveFive: Ember.computed('widgets.@each.count', function() {
    // Serves as validation
    return this.get('widgets').reduce(function(accum, widget){
      return accum && widget.count > 5;
    }, true);
  }),
  isButtonDisabled: Ember.computed.not('areAllAboveFive')
});

App.MyWidgetComponent = Ember.Component.extend({
  actions: {
    buttonClicked: function() {
      this.set('widget.count', this.get('widget.count') + 1)
    }
  }
});
