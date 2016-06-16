App = Ember.Application.create();

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
  isValid: Ember.computed('widgets.@each.count', function() {
    return isValid(this.get('widgets'));
  }),
  isButtonDisabled: Ember.computed.not('isValid')
});

App.MyWidgetComponent = Ember.Component.extend({
  actions: {
    buttonClicked: function() {
      this.set('widget.count', this.get('widget.count') + 1)
    }
  }
});

function isValid(widgets) {
  return widgets.reduce(function(accum, widget){
    return accum && widget.count > 5;
  }, true);
}
