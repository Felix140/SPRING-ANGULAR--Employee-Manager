package tech.getarrays.employeemanager.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
        super(message); // passo qui il costruttore di RuntimeException
    }
}
