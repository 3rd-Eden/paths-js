import Linear from './linear'
import { minBy, maxBy } from './ops'

const epsilon = 1e-5

let box = (datum, accessor, sort) => {
  let points = datum.map(accessor)
  let sorted = sort ? points.sort(([a, b], [c, d]) => a - c) : points
  let l = sorted.length
  let xmin = sorted[0][0]
  let xmax = sorted[l - 1][0]
  let ymin = minBy(sorted, (p) => p[1])
  let ymax = maxBy(sorted, (p) => p[1])
  if (xmin == xmax) { xmax += epsilon }
  if (ymin == ymax) { ymax += epsilon }

  return {
    points: sorted,
    xmin: xmin,
    xmax: xmax,
    ymin: ymin,
    ymax: ymax
  }
}

export default function({data, xaccessor, yaccessor, width, height, closed, ymin, ymax, xmax, xmin, sort = true}) {
  if (! xaccessor) { xaccessor = ([x, y]) => x }
  if (! yaccessor) { yaccessor = ([x, y]) => y }

  let f = (i) => [xaccessor(i), yaccessor(i)]

  let arranged = data.map((datum) => box(datum, f, sort))

  let _xmin = (xmin === null) ? minBy(arranged, (d) => d.xmin) : xmin
  let _xmax = (xmax === null) ? maxBy(arranged, (d) => d.xmax) : xmax

  let _ymin = (ymin == null) ? minBy(arranged, (d) => d.ymin) : ymin
  let _ymax = (ymax == null) ? maxBy(arranged, (d) => d.ymax) : ymax

  if (closed) {
    _ymin = Math.min(_ymin, 0)
    _ymax = Math.max(_ymax, 0)
  }

  let base = closed ? 0 : _ymin
  let xscale = Linear([_xmin, _xmax], [0, width])
  let yscale = Linear([_ymin, _ymax], [height, 0])
  let scale = ([x, y]) => [xscale(x), yscale(y)]

  return {
    arranged: arranged,
    scale: scale,
    xscale: xscale,
    yscale: yscale,
    base: base
  }
}
