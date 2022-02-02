import * as React from 'react'
import { Component } from 'react'


// https://dmitripavlutin.com/typescript-index-signatures/
/**
 * A step in the JsxGraph construction.
 */
export interface JsxGraphStep {
  /**
   * Type of the element to be constructed given as a string e.g. 'point' or 'circle'.
   */
  type: GeometryElementType
  /**
   * Array of parent elements needed to construct the element e.g. coordinates for a point or two points to construct a line.
   * This highly depends on the elementType that is constructed.
   * See the corresponding create* functions for a list of possible parameters.
   */
  parents: unknown[],
  /**
   * An object containing the attributes to be set.
   * This also depends on the elementType.
   * Common attributes are name, visible, strokeColor.
   */
  attributes?: Record<string, unknown>
}

/**
 * These are the (HTML) attributes of my JsxGraph tag.
 * This is accessed by the component as this.props
 */
interface JsxGraphProps {
  /**
   * The identifier of the board div element.
   */
  id: string,
  /**
   * The attributes used in the construction of the board.
   */
  attributes?: Partial<JXG.BoardAttributes>;
  /**
   * 
   */
  className?: string;
  /**
   * The steps in the construction.
   */
  steps: JsxGraphStep[]
}

/**
 * The internal state of the component.
 * When the state data changes, the markup will
 * be updated by re-invoking render().
 */
interface JsxGraphSpec {
  // Nothing to see here yet.
}

export class JsxGraph extends Component<JsxGraphProps, JsxGraphSpec> {
  private board: JXG.Board | undefined
  constructor(props: JsxGraphProps) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {
    this.board = JXG.JSXGraph.initBoard(this.props.id, this.props.attributes)
  }
  componentWillUnmount(): void {
    if (this.board) {
      JXG.JSXGraph.freeBoard(this.board)
      this.board = void 0
    }
  }
  render(): JSX.Element {
    try {
      if (this.board) {
        const elements: { [name: string]: JXG.GeometryElement } = {}
        for (const step of this.props.steps) {
          const element: JXG.GeometryElement = this.board.create(step.type as any, step.parents, step.attributes)
          elements[element.name] = element
        }
        this.board.update()
      }
    } catch (e) {
      return <div><p>${e}</p></div>
    }
    return <div id={`${this.props.id}`} className={`${this.props.className}`} style={{ width: 500 + 'px', height: 500 + 'px' }}></div>
  }
}

/**
 * Constructs a line.
 * @param parents Determine the location of the line.
 * @param attributes Determine the appearance of the line.
 */
export function circle(parents: unknown[], attributes?: JXG.CircleAttributes): JsxGraphStep {
  const step: JsxGraphStep = { type: 'circle', parents, attributes }
  return step
}

/**
 * Constructs a line.
 * @param parents Determine the location of the line.
 * @param attributes Determine the appearance of the line.
 */
export function line(parents: [firstPointName: string, lastPointName: string], attributes?: JXG.LineAttributes): JsxGraphStep {
  const step: JsxGraphStep = { type: 'line', parents, attributes }
  return step
}

/**
 * Constructs a point.
 * @param parents Determine the location of the point.
 * @param attributes Determine the appearance of the point.
 */
export function point(parents: [x: number, y: number], attributes?: JXG.PointAttributes): JsxGraphStep {
  const step: JsxGraphStep = { type: 'point', parents, attributes }
  return step
}

/**
 * Constructs a line.
 * @param parents Determine the location of the line.
 * @param attributes Determine the appearance of the line.
 */
export function segment(parents: [firstPointName: string, lastPointName: string], attributes?: JXG.SegmentAttributes): JsxGraphStep {
  const step: JsxGraphStep = { type: 'segment', parents, attributes }
  return step
}

/**
 * Creates a new geometric element of type elementType.
 * @param elementType Type of the element to be constructed given as a string e.g. 'point' or 'circle'.
 * @param parents Array of parent elements needed to construct the element e.g. coordinates for a point or two points to construct a line. This highly depends on the elementType that is constructed. See the corresponding JXG.create* methods for a list of possible parameters.
 * @param attributes An object containing the attributes to be set. This also depends on the elementType. Common attributes are name, visible, strokeColor.
 */
export function element(elementType: GeometryElementType, parents: unknown[], attributes?: Record<string, unknown>): JsxGraphStep {
  const step: JsxGraphStep = { type: elementType, parents, attributes }
  return step
}

/**
 * The allowed kinds of geometry elements that can be constructed.
 */
export type GeometryElementType =
  'angle' |
  'arc' |
  'arrow' |
  'axis' |
  'bisector' |
  'button' |
  'cardinalspline' |
  'chart' |
  'checkbox' |
  'circle' |
  'circumcircle' |
  'circumcirclearc' |
  'circumcirclesector' |
  'comb' |
  'conic' |
  'curve' |
  'curvedifference' |
  'curveintersection' |
  'curveunion' |
  'ellipse' |
  'functiongraph' |
  'glider' |
  'grid' |
  'group' |
  'hatch' |
  'hyperbola' |
  'image' |
  'input' |
  'integral' |
  'intersection' |
  'line' |
  'metapostspline' |
  'midpoint' |
  'minorArc' |
  'mirrorelement' |
  'normal' |
  'perpendicular' |
  'plot' |
  'point' |
  'polygon' |
  'polygonchain' |
  'regularpolygon' |
  'reflection' |
  'riemannsum' |
  'sector' |
  'semicircle' |
  'segment' |
  'slider' |
  'slopetriangle' |
  'stepfunction' |
  'tangent' |
  'tapemeasure' |
  'text' |
  'ticks' |
  'tracecurve' |
  'transform' |
  'turtle'
