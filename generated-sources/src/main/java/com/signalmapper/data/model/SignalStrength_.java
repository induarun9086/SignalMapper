package com.signalmapper.data.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(SignalStrength.class)
public abstract class SignalStrength_ {

	public static volatile SingularAttribute<SignalStrength, Technology> technology;
	public static volatile SingularAttribute<SignalStrength, Location> location;
	public static volatile SingularAttribute<SignalStrength, Integer> signalStrengthValue;
	public static volatile SingularAttribute<SignalStrength, Long> signalStrengthID;
	public static volatile SingularAttribute<SignalStrength, Operator> operator;

}

