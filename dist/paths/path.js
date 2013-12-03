(function() {
  define([], function() {
    var Path;
    Path = function(init) {
      var instructions, plus, printInstrunction, push;
      instructions = init || [];
      push = function(arr, el) {
        var copy;
        copy = arr.slice(0, arr.length);
        copy.push(el);
        return copy;
      };
      printInstrunction = function(_arg) {
        var command, params;
        command = _arg.command, params = _arg.params;
        return "" + command + " " + (params.join(' '));
      };
      plus = function(instruction) {
        return Path(push(instructions, instruction));
      };
      return {
        moveto: function(x, y) {
          return plus({
            command: 'M',
            params: [x, y]
          });
        },
        lineto: function(x, y) {
          return plus({
            command: 'L',
            params: [x, y]
          });
        },
        closepath: function() {
          return plus({
            command: 'Z',
            params: []
          });
        },
        curveto: function(x2, y2, x, y) {
          return plus({
            command: 'S',
            params: [x2, y2, x, y]
          });
        },
        qcurveto: function(x, y) {
          return plus({
            command: 'Q',
            params: [x, y]
          });
        },
        arc: function(rx, ry, xrot, large_arc_flag, sweep_flag, x, y) {
          return plus({
            command: 'A',
            params: [rx, ry, xrot, large_arc_flag, sweep_flag, x, y]
          });
        },
        print: function() {
          return instructions.map(printInstrunction).join(' ');
        }
      };
    };
    return Path;
  });

}).call(this);