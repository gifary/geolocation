<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/iam/v1/policy.proto

namespace Google\Cloud\Iam\V1;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Defines an Identity and Access Management (IAM) policy. It is used to
 * specify access control policies for Cloud Platform resources.
 * A `Policy` consists of a list of `bindings`. A `Binding` binds a list of
 * `members` to a `role`, where the members can be user accounts, Google groups,
 * Google domains, and service accounts. A `role` is a named list of permissions
 * defined by IAM.
 * **Example**
 *     {
 *       "bindings": [
 *         {
 *           "role": "roles/owner",
 *           "members": [
 *             "user:mike&#64;example.com",
 *             "group:admins&#64;example.com",
 *             "domain:google.com",
 *             "serviceAccount:my-other-app&#64;appspot.gserviceaccount.com",
 *           ]
 *         },
 *         {
 *           "role": "roles/viewer",
 *           "members": ["user:sean&#64;example.com"]
 *         }
 *       ]
 *     }
 * For a description of IAM and its features, see the
 * [IAM developer's guide](https://cloud.google.com/iam).
 *
 * Generated from protobuf message <code>google.iam.v1.Policy</code>
 */
class Policy extends \Google\Protobuf\Internal\Message
{
    /**
     * Version of the `Policy`. The default version is 0.
     *
     * Generated from protobuf field <code>int32 version = 1;</code>
     */
    private $version = 0;
    /**
     * Associates a list of `members` to a `role`.
     * Multiple `bindings` must not be specified for the same `role`.
     * `bindings` with no members will result in an error.
     *
     * Generated from protobuf field <code>repeated .google.iam.v1.Binding bindings = 4;</code>
     */
    private $bindings;
    /**
     * `etag` is used for optimistic concurrency control as a way to help
     * prevent simultaneous updates of a policy from overwriting each other.
     * It is strongly suggested that systems make use of the `etag` in the
     * read-modify-write cycle to perform policy updates in order to avoid race
     * conditions: An `etag` is returned in the response to `getIamPolicy`, and
     * systems are expected to put that etag in the request to `setIamPolicy` to
     * ensure that their change will be applied to the same version of the policy.
     * If no `etag` is provided in the call to `setIamPolicy`, then the existing
     * policy is overwritten blindly.
     *
     * Generated from protobuf field <code>bytes etag = 3;</code>
     */
    private $etag = '';

    public function __construct() {
        \GPBMetadata\Google\Iam\V1\Policy::initOnce();
        parent::__construct();
    }

    /**
     * Version of the `Policy`. The default version is 0.
     *
     * Generated from protobuf field <code>int32 version = 1;</code>
     * @return int
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * Version of the `Policy`. The default version is 0.
     *
     * Generated from protobuf field <code>int32 version = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setVersion($var)
    {
        GPBUtil::checkInt32($var);
        $this->version = $var;

        return $this;
    }

    /**
     * Associates a list of `members` to a `role`.
     * Multiple `bindings` must not be specified for the same `role`.
     * `bindings` with no members will result in an error.
     *
     * Generated from protobuf field <code>repeated .google.iam.v1.Binding bindings = 4;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getBindings()
    {
        return $this->bindings;
    }

    /**
     * Associates a list of `members` to a `role`.
     * Multiple `bindings` must not be specified for the same `role`.
     * `bindings` with no members will result in an error.
     *
     * Generated from protobuf field <code>repeated .google.iam.v1.Binding bindings = 4;</code>
     * @param \Google\Cloud\Iam\V1\Binding[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setBindings($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Google\Cloud\Iam\V1\Binding::class);
        $this->bindings = $arr;

        return $this;
    }

    /**
     * `etag` is used for optimistic concurrency control as a way to help
     * prevent simultaneous updates of a policy from overwriting each other.
     * It is strongly suggested that systems make use of the `etag` in the
     * read-modify-write cycle to perform policy updates in order to avoid race
     * conditions: An `etag` is returned in the response to `getIamPolicy`, and
     * systems are expected to put that etag in the request to `setIamPolicy` to
     * ensure that their change will be applied to the same version of the policy.
     * If no `etag` is provided in the call to `setIamPolicy`, then the existing
     * policy is overwritten blindly.
     *
     * Generated from protobuf field <code>bytes etag = 3;</code>
     * @return string
     */
    public function getEtag()
    {
        return $this->etag;
    }

    /**
     * `etag` is used for optimistic concurrency control as a way to help
     * prevent simultaneous updates of a policy from overwriting each other.
     * It is strongly suggested that systems make use of the `etag` in the
     * read-modify-write cycle to perform policy updates in order to avoid race
     * conditions: An `etag` is returned in the response to `getIamPolicy`, and
     * systems are expected to put that etag in the request to `setIamPolicy` to
     * ensure that their change will be applied to the same version of the policy.
     * If no `etag` is provided in the call to `setIamPolicy`, then the existing
     * policy is overwritten blindly.
     *
     * Generated from protobuf field <code>bytes etag = 3;</code>
     * @param string $var
     * @return $this
     */
    public function setEtag($var)
    {
        GPBUtil::checkString($var, False);
        $this->etag = $var;

        return $this;
    }

}

