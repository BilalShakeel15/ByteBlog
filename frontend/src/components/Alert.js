import React from 'react'

const Alert = (props) => {
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`} role="alert" style={{ marginTop: `${props.alert.margin}rem`, marginBottom: "0rem" }}>
    <strong>{props.alert.type==="danger"?"Alert":props.alert.type}</strong> {props.alert.msg}
</div>
  )
}

export default Alert
