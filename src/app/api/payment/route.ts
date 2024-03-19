import Razorpay from "razorpay";

export async function POST(request: Request) {
  const req = await request.json();
  var instance = new Razorpay({
    key_id: "rzp_test_gKANZdsNdLqaQs",
    key_secret: "3UFrNGkdLR9apMa3dOUE1jvh",
  });

  const order = await instance.orders.create({
    amount: req.amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
  return Response.json({ success: true, order });
}
