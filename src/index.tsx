import * as React from 'react'
import { Component } from 'react'

export interface JsxGraphStep {
  kind: 'point' | 'line' | 'segment'
  parents: unknown[],
  attributes: Record<string, unknown>
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
  seconds: number
}

export class JsxGraph extends Component<JsxGraphProps, JsxGraphSpec> {
  private board: JXG.Board | undefined
  constructor(props: JsxGraphProps) {
    super(props)
    this.state = { seconds: 0 }
  }
  componentDidMount(): void {
    console.log("JsxGraph.componentDidMount()")
    this.board = JXG.JSXGraph.initBoard(this.props.id, {
      axis: true,
      boundingBox: [-6, 6, 6, -6],
      showCopyright: false,
      showNavigation: false,
      showScreenshot: true
    })
  }
  componentWillUnmount(): void {
    console.log("JsxGraph.componentWillUnmount()")
    if (this.board) {
      JXG.JSXGraph.freeBoard(this.board)
      this.board = void 0
    }
  }
  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }))
  }
  render() {
    console.log("JsxGraph.render()")
    // console.log(`steps=>${JSON.stringify(this.props.steps, null, 2)}`)
    try {
      if (this.board) {
        const elements: { [name: string]: JXG.GeometryElement } = {}
        for (const step of this.props.steps) {
          // TODO: Do we need a more generic create method on the JXG.Board?
          const element: JXG.GeometryElement = this.board.create(step.kind as 'point', step.parents, step.attributes)
          elements[element.name] = element
        }
        this.board.update()
      }
    } catch (e) {
      console.warn(e)
    } finally {
      return <div id={`${this.props.id}`} className='jxgbox' style={{ width: 500 + 'px', height: 500 + 'px' }}></div>
    }
  }
}

/**
 * Constructs a point.
 * @param parents Determine the location of the point.
 * @param attributes Determine the appearance of the point.
 */
export function createPoint(parents: [x: number, y: number], attributes: JXG.PointAttributes): JsxGraphStep {
  const step: JsxGraphStep = {
    kind: 'point',
    parents,
    // TODO: How to avoid having to do this?
    // Is the problem with JXG.PointAttributes or Record<string,unkown>
    attributes: attributes as Record<string, unknown>
  }
  return step
}

/**
 * Constructs a line.
 * @param parents Determine the location of the line.
 * @param attributes Determine the appearance of the line.
 */
export function createLine(parents: [firstPointName: string, lastPointName: string], attributes: JXG.LineAttributes): JsxGraphStep {
  const step: JsxGraphStep = {
    kind: 'line',
    parents,
    // TODO: How to avoid having to do this?
    // Is the problem with JXG.PointAttributes or Record<string,unkown>
    attributes: attributes as Record<string, unknown>
  }
  return step
}

/**
 * Constructs a line.
 * @param parents Determine the location of the line.
 * @param attributes Determine the appearance of the line.
 */
export function createSegment(parents: [firstPointName: string, lastPointName: string], attributes: JXG.SegmentAttributes): JsxGraphStep {
  const step: JsxGraphStep = {
    kind: 'segment',
    parents,
    // TODO: How to avoid having to do this?
    // Is the problem with JXG.PointAttributes or Record<string,unkown>
    attributes: attributes as Record<string, unknown>
  }
  return step
}
