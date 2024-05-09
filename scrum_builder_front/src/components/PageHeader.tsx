import { ArrowLeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface pageHeaderProps {
    title: string;
    subTitle?: string;
    goBack: boolean;
    actionButton: boolean;
    toActionButton?: string;
    textActionButton?: string
    hasCrumbs: boolean;
    breadCrumbs?: Array<{ key: string, label: string }>;
    onClick?: () => void;
    isDangerButton?: boolean;
}
export function PageHeader(props: pageHeaderProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push('/projects/create-project');
    }
    return (
        <div className="pageHeader-div">
            {props.hasCrumbs && props.breadCrumbs !== undefined ?
                <div className="crumbs">
                    <Breadcrumb>
                        {props.breadCrumbs.map((crumb: { key: string, label: string }) => (
                            <Breadcrumb.Item key = {crumb.key}>
                                <Link href={crumb.key}>{crumb.label}</Link>
                            </Breadcrumb.Item>))
                        }
                    </Breadcrumb></div>
                : null
            }
            <h1 className="text-2xl font-bold py-3">
                {props.goBack ?
                    <Button onClick={() => window.history.back()} icon={<ArrowLeftOutlined rev={undefined} />} type="text" size="large" />
                    : null
                }
                {props.title}
                {props.actionButton && props.toActionButton !== undefined && props.textActionButton !== undefined ?
                    <Button className="absolute right-1" onClick={handleClick}>{props.textActionButton}</Button>
                    : null
                }
                {
                    props.actionButton && props.onClick !== undefined && props.textActionButton && props.isDangerButton ?
                        <Button onClick={props.onClick} className="absolute top-0 right-0 h-16 w-16" danger>{props.textActionButton}</Button>
                        : null
                }
                {
                    props.actionButton && props.onClick !== undefined && props.textActionButton && !props.isDangerButton ?
                        <button onClick={props.onClick} className="absolute top-0 right-0 h-16 w-16">{props.textActionButton}</button>
                        : null
                }
            </h1>
            {
                props.subTitle ? <h3 className="pageHeader">{props.subTitle}</h3> : null
            }
        </div>
    )
}