import { useAppSelector } from "../store/hooks"

export function getUserMenuState() {
    const isUserMenuOpen = useAppSelector(state => state.userMenu.isUserMenuOpen);
    return isUserMenuOpen
}

