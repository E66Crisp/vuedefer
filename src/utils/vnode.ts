import {
  Comment,
  isVNode,
} from 'vue'

import type { VNode, VNodeNormalizedChildren } from 'vue'

/**
 * Check if a node is a comment node
 */
export function isComment(node: VNode): boolean
export function isComment(node: unknown): node is VNode
export function isComment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Comment
}

/**
 * Check if a node is a valid component node (has component instance and is not a comment)
 * @param node - VNode to be tested
 */
export function isValidComponentNode(node: VNode): boolean
export function isValidComponentNode(node: unknown): node is VNode
export function isValidComponentNode(node: unknown): node is VNode {
  return (
    isVNode(node) &&
    !isComment(node) &&
    !!node.component
  )
}

/**
 * Get the first valid component node from children
 * Filters out comment nodes and returns the first node that has a component instance
 * @param children - VNode children to search
 * @returns First valid component node or null
 */
export function getFirstValidComponentNode(
  children: VNodeNormalizedChildren | null | undefined
): VNode | null {
  if (!children) {
    return null
  }

  const nodes = Array.isArray(children) ? children : [children]

  for (const node of nodes) {
    if (isValidComponentNode(node)) {
      return node
    }
  }

  return null
}

