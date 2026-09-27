import { getSocialIcon } from '@/core/config/social-media/social-icons';
import { IconBaseProps } from 'react-icons';
import React from 'react'

interface Props extends IconBaseProps {
    platform: string;
}

const SocialIcon = ({ platform, ...props }: Props) => {
    const Icon = getSocialIcon(platform);
    return <Icon {...props} />;
}

export default SocialIcon
