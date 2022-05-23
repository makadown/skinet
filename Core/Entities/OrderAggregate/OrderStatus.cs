using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    /// <summary>
    /// This enum contains flags to say what state the order is at.
    /// </summary>
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "Payment Received")]
        PaymentReceived,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
}