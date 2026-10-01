import { getSocialIcon } from '@/core/config/social-media/social-icons';
import { IconBaseProps } from 'react-icons';
import React from 'react'

interface Props extends IconBaseProps {
    platform: string;
}

const SocialIcon = ({ platform, ...props }: Props) => {
    // The icon comes from a static map; createElement avoids declaring a component during render
    return React.createElement(getSocialIcon(platform), props);
}

export default SocialIcon
