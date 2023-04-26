from flask import request, jsonify
import ethers

def authenticate_metamask():
    """
    Authenticates the user using MetaMask and returns the user's wallet address
    """
    signature = request.headers.get('Signature')
    message = request.headers.get('Message')
    address = request.headers.get('Address')

    # Convert the signature to a bytes array
    signature_bytes = bytes.fromhex(signature[2:])

    # Decode the message to a bytes array
    message_bytes = message.encode('utf-8')

    # Create a new ethers.js message object from the message bytes
    msg = ethers.utils.hash_message(message_bytes)

    # Recover the public key from the signature
    public_key = ethers.utils.recover_public_key_from_sig(signature_bytes, message=msg)

    # Get the wallet address from the public key
    recovered_address = ethers.utils.public_key_to_address(public_key)

    # Compare the recovered address with the address sent in the headers
    if address.lower() != recovered_address.lower():
        raise Exception('Invalid signature')

    return address

@app.before_request
def authenticate_user():
    """
    Authenticates the user for every request using MetaMask
    """
    if request.endpoint == 'connect_wallet':
        return  # Don't require authentication for connect_wallet endpoint

    if request.endpoint == 'disconnect_wallet':
        return  # Don't require authentication for disconnect_wallet endpoint

    wallet_address = authenticate_metamask()
    # Add the wallet_address to the request object so it can be accessed by the endpoints
    request.wallet_address = wallet_address
