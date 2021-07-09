import { ActionCreatorsMapObject, Dispatch } from 'redux'
import bindActionCreators from '../utils/bindActionCreators'
import { MapDispatchToProps } from './selectorFactory'
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'

export function whenMapDispatchToPropsIsFunction(
  mapDispatchToProps: ActionCreatorsMapObject | MapDispatchToProps<any, any>
) {
  return typeof mapDispatchToProps === 'function'
    ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
    : undefined
}

export function whenMapDispatchToPropsIsMissing(mapDispatchToProps: undefined) {
  return !mapDispatchToProps
    ? wrapMapToPropsConstant((dispatch: Dispatch) => ({
        dispatch,
      }))
    : undefined
}

export function whenMapDispatchToPropsIsObject(
  mapDispatchToProps: ActionCreatorsMapObject
) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object'
    ? wrapMapToPropsConstant((dispatch: Dispatch) =>
        bindActionCreators(mapDispatchToProps, dispatch)
      )
    : undefined
}

export default [
  whenMapDispatchToPropsIsFunction,
  whenMapDispatchToPropsIsMissing,
  whenMapDispatchToPropsIsObject,
]
