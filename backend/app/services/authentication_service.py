from flask import request
import ethers

class AuthenticationService:
    @staticmethod
    def authenticate_metamask():
        signature = request.headers.get('Signature')
        message = request.headers.get('Message')
        address = request.headers.get('Address')

        signature_bytes = bytes.fromhex(signature[2:])
        message_bytes = message.encode('utf-8')
        msg = ethers.utils.hash_message(message_bytes)
        public_key = ethers.utils.recover_public_key_from_sig(signature_bytes, message=msg)
        recovered_address = ethers.utils.public_key_to_address(public_key)

        if address.lower() != recovered_address.lower():
            raise Exception('Invalid signature')

        return address

    @staticmethod
    def authenticate_user(func):
        def wrapper(*args, **kwargs):
            try:
                wallet_address = AuthenticationService.authenticate_metamask()
                request.wallet_address = wallet_address
                return func(*args, **kwargs)
            except Exception as e:
                return {"error": str(e)}, 401

        return wrapper

    @staticmethod
    def try_authenticate_user():
        try:
            wallet_address = AuthenticationService.authenticate_metamask()
            return wallet_address
        except Exception as e:
            return None
