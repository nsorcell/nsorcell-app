import Loader from "components/loader"
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
  isLoading?: boolean
  onClick: () => void
}

const Button: FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  const click = useCallback(() => {
    if (disabled || isLoading) {
      return
    }
    onClick()
  }, [onClick, disabled, isLoading])

  return (
    <StyledButton
      onClick={click}
      iconPosition={icon?.position}
      disabled={disabled}
      isLoading={isLoading}
    >
      {isLoading ? (
        <Loader size="md" />
      ) : (
        <>
          <Text variant="label">{label}</Text>
          {icon && (
            <IconContainer iconPosition={icon.position}>
              {icon.component}
            </IconContainer>
          )}
        </>
      )}
    </StyledButton>
  )
}

export default Button
