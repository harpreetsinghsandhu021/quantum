import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HintCards = () => {
  return (
    <div className="my-4 flex flex-wrap gap-4">
      <HintCard
        title="Personalized Financial Planning and Advice"
        description="You may lack the time or skills to evaluate the right stocks for your portfolio, and the jargon can be confusing. That's why you need guidance. "
      />
      <HintCard
        title="Automated Investment Management"
        description="Intelligent asset allocation across various asset classes, while traditional stock advisory services offer ready-made equity portfolios managed by fund managers."
      />
      <HintCard
        title="Secure and Convenient Access"
        description="Accessible from any device with an internet connection, 24/7 customer support for any questions or concerns"
      />
      <HintCard
        title="Access Expert Guidance Without the Price Tag"
        description="Discover a wealth of financial insights and personalized advice at no cost, enabling you to make informed investment decisions."
      />
    </div>
  );
};

export function HintCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default HintCards;
