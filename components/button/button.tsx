import { Text } from "components/typography"
import { FC, ReactNode, useCallback } from "react"
import "twin.macro"
import { IconContainer, StyledButton } from "./button.styled"

type ButtonProps = {
  label: string
  icon?: {
    position: "left" | "right"
    component: ReactNode
  }
  disabled?: boolean
  onClick: () => void
}

const Button: FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  disabled = false,
}) => {
  const click = useCallback(() => {
    if (disabled) {
      return
    }
    onClick()
  }, [onClick])

  return (
    <StyledButton
      onClick={click}
      iconPosition={icon?.position}
      disabled={disabled}
    >
      <Text variant="label">{label}</Text>
      {icon && (
        <IconContainer iconPosition={icon.position}>
          {icon.component}
        </IconContainer>
      )}
    </StyledButton>
  )
}

export default Button
